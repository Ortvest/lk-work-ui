import { Fragment, useEffect } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { StudentCardFormBody } from '@modules/Documents/StudentCard/features/StudentCardFormBody';
import { StudentCardPreviewBody } from '@modules/Documents/StudentCard/features/StudentCardPreviewBody';
import { Sidebar } from '@modules/Sidebar';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { GlobalContainer } from '@shared/components/GlobalContainer';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserStudentDataMutation } from '@global/api/updateUserData/collectData.api';
import { useUploadPhotoMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { UserRoles } from '@shared/enums/user.enums';
import { EducationDocuments } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';
import { datePartsParser } from '@shared/utils/datePartsParser';

export const StudentCard = (): JSX.Element => {
  const studentCardData = useTypedSelector((state) => state.userReducer.user?.documents.educationDocuments);

  const selectedEmployeeStudentCardData = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.documents.educationDocuments
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? studentCardData : selectedEmployeeStudentCardData;

  const methods = useForm<EducationDocuments>({
    defaultValues: {
      studentFrontCardFileKey: currentDataOrigin?.studentFrontCardFileKey ?? '',
      studentBackCardFileKey: currentDataOrigin?.studentBackCardFileKey ?? '',
      studentPermitCardFileKey: currentDataOrigin?.studentPermitCardFileKey ?? '',
      studentStatusDate: datePartsParser(currentDataOrigin?.studentStatusDate),
    },
  });

  const [uploadfile] = useUploadPhotoMutation();
  const [collectUserStudentData] = useCollectUserStudentDataMutation();
  const employeeId = useTypedSelector((state) => state.employeeReducer.selectedEmployee?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const dispatch = useTypedDispatch();

  const onSaveHandler = async (data: EducationDocuments): Promise<void> => {
    if (!employeeId) return;

    try {
      const upload = async (file?: File | string): Promise<string> => {
        if (!file || typeof file === 'string') return file ?? '';
        const formData = new FormData();
        formData.append('file', file);
        return (await uploadfile(formData)).data?.fileKey ?? '';
      };

      const frontKey = await upload(data.studentFrontCardFileKey);
      const backKey = await upload(data.studentBackCardFileKey);
      const permitKey = await upload(data.studentPermitCardFileKey);

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

  useEffect(() => {
    if (currentDataOrigin) {
      methods.reset({
        studentFrontCardFileKey: currentDataOrigin.studentFrontCardFileKey ?? '',
        studentBackCardFileKey: currentDataOrigin.studentBackCardFileKey ?? '',
        studentPermitCardFileKey: currentDataOrigin.studentPermitCardFileKey ?? '',
        studentStatusDate: datePartsParser(currentDataOrigin.studentStatusDate),
      });
    }
  }, [currentDataOrigin]);

  return (
    <Fragment>
      {userRole !== UserRoles.EMPLOYEE ? (
        <FormProvider {...methods}>
          <GlobalContainer>
            <Sidebar />
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
          </GlobalContainer>
        </FormProvider>
      ) : (
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
      )}
    </Fragment>
  );
};
