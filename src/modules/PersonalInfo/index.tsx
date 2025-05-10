import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { ContactSection } from '@modules/PersonalInfo/features/ContactsSection';
import { PersonalInfoSection } from '@modules/PersonalInfo/features/PersonalInfoSection';
import { PrefferedCompaniesSection } from '@modules/PersonalInfo/features/PrefferedCompaniesSection';
import { WorkStartSection } from '@modules/PersonalInfo/features/WorkStartSection';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import './style.css';

import { useCollectUserPersonalInfoMutation } from '@global/api/updateUserData/collectData.api';
import { useUploadPhotoMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { PersonalInfo, PersonalInfoData } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';

export const PersonalInfoForm = (): JSX.Element => {
  const employee = useTypedSelector((state) => state.userReducer.user);
  const [collectUserPersonalInfo] = useCollectUserPersonalInfoMutation();
  const [uploadPhoto] = useUploadPhotoMutation();

  const dispatch = useTypedDispatch();
  const { setIsEditModeEnabled } = CommonSlice.actions;

  const methods = useForm<PersonalInfoData>({
    defaultValues: {
      ...(employee?.personalInfo as unknown as PersonalInfoData),
    },
  });

  const onSaveHandler = async (data: PersonalInfoData): Promise<void> => {
    if (!employee?._id) return;

    const formData = new FormData();

    if (data.avatarFile) {
      formData.append('file', data.avatarFile);
    }

    const fileKey = (await uploadPhoto(formData)).data?.fileKey as string;

    const parsedData: PersonalInfo = {
      ...data,
      avatarUrl: fileKey,
      dateOfBirth: dateParser(JSON.stringify(data.dateOfBirth!)),
      timeFromWorkStartDate: dateParser(JSON.stringify(data.timeFromWorkStartDate!)),
      nationalPhoneNumber: data.nationalPhoneNumber
        ? data.nationalPhoneNumber?.prefix + data.nationalPhoneNumber?.number
        : '',
      polishPhoneNumber: data.polishPhoneNumber ? data.polishPhoneNumber?.prefix + data.polishPhoneNumber?.number : '',
    };

    try {
      await collectUserPersonalInfo({ personalData: parsedData, employeeId: employee?._id});
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save job info:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('personal-info')}>
        <form className={classNames('personal-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <PersonalInfoSection />
          <ContactSection />
          <WorkStartSection />
          <PrefferedCompaniesSection />
        </form>
      </section>
    </FormProvider>
  );
};
