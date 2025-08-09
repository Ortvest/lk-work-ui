import { Fragment, useEffect } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { ContactSection } from '@modules/PersonalInfo/features/ContactsSection';
import { PersonalInfoSection } from '@modules/PersonalInfo/features/PersonalInfoSection';
import { PrefferedCompaniesSection } from '@modules/PersonalInfo/features/PrefferedCompaniesSection';
import { Sidebar } from '@modules/Sidebar';
//import { WorkStartSection } from '@modules/PersonalInfo/features/WorkStartSection';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { GlobalContainer } from '@shared/components/GlobalContainer';

import './style.css';

import {
  useCollectUserGlobalDataMutation,
  useCollectUserPersonalInfoMutation,
} from '@global/api/updateUserData/collectData.api';
import { useUploadPhotoMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { UserRoles } from '@shared/enums/user.enums';
import { PersonalInfo } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';
import { datePartsParser } from '@shared/utils/datePartsParser';
import { phoneNumberParser } from '@shared/utils/phoneNumberParser';

export const PersonalInfoForm = (): JSX.Element => {
  const employeeId = useTypedSelector((state) => state.employeeReducer.selectedEmployee?._id);
  const personalDataInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);
  const selectedEmployeePersonalData = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.personalInfo
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? personalDataInfo : selectedEmployeePersonalData;

  const dispatch = useTypedDispatch();
  const { setIsEditModeEnabled } = CommonSlice.actions;

  const [collectUserPersonalInfo] = useCollectUserPersonalInfoMutation();
  const [collectUserGlobalData] = useCollectUserGlobalDataMutation();
  const [uploadPhoto] = useUploadPhotoMutation();

  const methods = useForm<PersonalInfo>({ defaultValues: {} });

  useEffect(() => {
    if (currentDataOrigin) {
      methods.reset({
        ...currentDataOrigin,
        dateOfBirth: datePartsParser(currentDataOrigin.dateOfBirth),
        polishPhoneNumber:
          typeof currentDataOrigin.polishPhoneNumber === 'string'
            ? phoneNumberParser(currentDataOrigin.polishPhoneNumber)
            : currentDataOrigin.polishPhoneNumber,
        nationalPhoneNumber:
          typeof currentDataOrigin.nationalPhoneNumber === 'string'
            ? phoneNumberParser(currentDataOrigin.nationalPhoneNumber)
            : currentDataOrigin.nationalPhoneNumber,
        avatarUrl: currentDataOrigin.avatarUrl,
        consentToEmailPIT: currentDataOrigin.consentToEmailPIT ?? true,
      });
    }
  }, [currentDataOrigin]);

  const onSaveHandler = async (data: PersonalInfo): Promise<void> => {
    console.log(data);
    if (!employeeId) return;

    let fileKey = '';

    if (data.avatarUrl instanceof File) {
      const formData = new FormData();
      formData.append('file', data.avatarUrl);
      fileKey = (await uploadPhoto(formData)).data?.fileKey ?? '';
    } else {
      fileKey = data.avatarUrl || '';
    }

    const parsedData: PersonalInfo = {
      ...currentDataOrigin,
      ...data,
      avatarUrl: fileKey,
      dateOfBirth: dateParser(JSON.stringify(data.dateOfBirth || currentDataOrigin?.dateOfBirth)),
      polishPhoneNumber:
        typeof data.polishPhoneNumber === 'object'
          ? data.polishPhoneNumber.prefix + data.polishPhoneNumber.number
          : data.polishPhoneNumber,
      nationalPhoneNumber:
        typeof data.nationalPhoneNumber === 'object'
          ? data.nationalPhoneNumber.prefix + data.nationalPhoneNumber.number
          : data.nationalPhoneNumber,
    };

    try {
      await collectUserPersonalInfo({ personalData: parsedData, employeeId });
      await collectUserGlobalData({ consentToEmailPITInfo: data.consentToEmailPIT, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save personal info:', error);
    }
  };

  return (
    <Fragment>
      {userRole !== UserRoles.EMPLOYEE ? (
        <FormProvider {...methods}>
          <GlobalContainer>
            <Sidebar />
            <section className={classNames('personal-info')}>
              <form
                className={classNames('personal-info-form')}
                key={employeeId}
                onSubmit={methods.handleSubmit(onSaveHandler)}>
                <StatusPanel />
                <PersonalInfoSection />
                <ContactSection />
                {/* <WorkStartSection /> */}
                <PrefferedCompaniesSection />
              </form>
            </section>
          </GlobalContainer>
        </FormProvider>
      ) : (
        <FormProvider {...methods}>
          <section className={classNames('personal-info')}>
            <form
              className={classNames('personal-info-form')}
              key={employeeId}
              onSubmit={methods.handleSubmit(onSaveHandler)}>
              <StatusPanel />
              <PersonalInfoSection />
              <ContactSection />
              {/* <WorkStartSection /> */}
              <PrefferedCompaniesSection />
            </form>
          </section>
        </FormProvider>
      )}
    </Fragment>
  );
};
