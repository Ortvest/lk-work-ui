import { Fragment, useEffect } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { UkrainianDocsFormBody } from '@modules/Documents/UkrainianDocs/features/UkrainianDocsFormBody';
import { UkrainianDocsPreviewBody } from '@modules/Documents/UkrainianDocs/features/UkrainianDocsPreviewBody';
import { Sidebar } from '@modules/Sidebar';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { GlobalContainer } from '@shared/components/GlobalContainer';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserUkrainianStatementDocumentMutation } from '@global/api/updateUserData/collectData.api';
import { useUploadPhotoMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { UserRoles } from '@shared/enums/user.enums';
import { UkrainianStatementDocument } from '@shared/interfaces/User.interfaces';
import { useTranslation } from "react-i18next";

export const UkrainianStatementDocuments = (): JSX.Element => {
  const {t} = useTranslation('employee-sidebar')
  const ukrainianStatementDocument = useTypedSelector(
    (state) => state.userReducer.user?.documents.ukrainianStatementDocument
  );

  const selectedEmployeeUkrainianStatementDocument = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.documents.ukrainianStatementDocument
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin =
    userRole === UserRoles.EMPLOYEE ? ukrainianStatementDocument : selectedEmployeeUkrainianStatementDocument;

  const methods = useForm<UkrainianStatementDocument>({
    defaultValues: {
      statementDocumentFileKey: currentDataOrigin?.statementDocumentFileKey ?? '',
    },
  });

  const [uploadFile] = useUploadPhotoMutation();
  const [collectUkrainianStatementDocument] = useCollectUserUkrainianStatementDocumentMutation();
  const employeeId = useTypedSelector((state) => state.employeeReducer.selectedEmployee?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const dispatch = useTypedDispatch();

  const onSaveHandler = async (data: UkrainianStatementDocument): Promise<void> => {
    if (!employeeId) return;

    try {
      let fileKey = '';
      if (data.statementDocumentFileKey instanceof File) {
        const formData = new FormData();
        formData.append('file', data.statementDocumentFileKey);
        fileKey = (await uploadFile(formData)).data?.fileKey ?? '';
      } else {
        fileKey = data.statementDocumentFileKey ?? '';
      }

      const parsedData: UkrainianStatementDocument = {
        statementDocumentFileKey: fileKey,
      };

      await collectUkrainianStatementDocument({ userUkrainianStatementDocument: parsedData, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save residence card data:', error);
    }
  };

  useEffect(() => {
    if (isEditModeEnabled && currentDataOrigin) {
      methods.reset({
        statementDocumentFileKey: currentDataOrigin?.statementDocumentFileKey ?? '',
      });
    }
  }, [isEditModeEnabled, currentDataOrigin, methods]);

  return (
    <Fragment>
      {userRole !== UserRoles.EMPLOYEE ? (
        <FormProvider {...methods}>
          <GlobalContainer>
            <Sidebar />
            <section className={classNames('statement-document')}>
              <form className={classNames('statement-document-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
                <StatusPanel />
                <SharedSectionHeader
                  title={t("routeUkrainianStatementDocument")}
                  subtitle={t("ukrainianStatementSubtitle")}
                />
                {isEditModeEnabled ? <UkrainianDocsFormBody /> : <UkrainianDocsPreviewBody />}
              </form>
            </section>
          </GlobalContainer>
        </FormProvider>
      ) : (
        <FormProvider {...methods}>
          <section className={classNames('statement-document')}>
            <form className={classNames('statement-document-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
              <StatusPanel />
              <SharedSectionHeader
                title={t("routeUkrainianStatementDocument")}
                subtitle={t("ukrainianStatementSubtitle")}
              />
              {isEditModeEnabled ? <UkrainianDocsFormBody /> : <UkrainianDocsPreviewBody />}
            </form>
          </section>
        </FormProvider>
      )}
    </Fragment>
  );
};
