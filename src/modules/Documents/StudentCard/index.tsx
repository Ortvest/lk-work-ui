import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { StudentCardFormBody } from '@modules/Documents/StudentCard/features/StudentCardFormBody';
import { StudentCardPreviewBody } from '@modules/Documents/StudentCard/features/StudentCardPreviewBody';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserStudentDataMutation } from '@global/api/updateUserData/collectData.api';
import { useUploadPhotoMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { EducationDocuments, StudentNotUploadedData } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';

export const StudentCard = (): JSX.Element => {
  const methods = useForm<EducationDocuments>();
  const [uploadfile] = useUploadPhotoMutation();
  const [collectUserStudentData] = useCollectUserStudentDataMutation();
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const dispatch = useTypedDispatch();

  const onSaveHandler = async (data: StudentNotUploadedData): Promise<void> => {
    if (!employeeId) return;

    try {
      const upload = async (file?: File): Promise<string> => {
        if (!file) return '';
        const formData = new FormData();
        formData.append('file', file);
        return (await uploadfile(formData)).data?.fileKey ?? '';
      };

      const frontKey = await upload(data.studentFrontCardFile);
      const backKey = await upload(data.studentBackCardFile);
      const permitKey = await upload(data.studentPermitCardFile);

      const parsedData: EducationDocuments = {
        studentFrontCardFileKey: frontKey,
        studentBackCardFileKey: backKey,
        studentPermitCardFileKey: permitKey,
        studentStatusDate: dateParser(JSON.stringify(data.studentStatusDate)),
      };

      await collectUserStudentData({ studentData: parsedData, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save student card data:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('student-card')}>
        <form className={classNames('student-card-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader
            title="Student Card"
            subtitle="Leave a photo of the document. Make sure the document is in good quality."
          />
          {isEditModeEnabled ? <StudentCardFormBody /> : <StudentCardPreviewBody />}
        </form>
      </section>
    </FormProvider>
  );
};
