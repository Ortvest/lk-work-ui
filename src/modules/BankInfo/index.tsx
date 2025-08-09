import { Fragment, useEffect } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { BankInfoFormBody } from '@modules/BankInfo/features/BankInfoFormBody';
import { BankInfoPreviewBody } from '@modules/BankInfo/features/BankInfoPreviewBody';
import { Sidebar } from '@modules/Sidebar';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { GlobalContainer } from '@shared/components/GlobalContainer';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserBankInfoMutation } from '@global/api/updateUserData/collectData.api';
import { UserRoles } from '@shared/enums/user.enums';
import { BankInfo } from '@shared/interfaces/User.interfaces';

export const BankInformation = (): JSX.Element => {
  const employeeId = useTypedSelector((state) => state.employeeReducer.selectedEmployee?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const [collectUserBankInfo] = useCollectUserBankInfoMutation();
  const dispatch = useTypedDispatch();
  const { setIsEditModeEnabled } = CommonSlice.actions;

  const bankInfo = useTypedSelector((state) => state.userReducer.user?.bankInfo);
  const selectedEmployeeBankInfo = useTypedSelector((state) => state.employeeReducer.selectedEmployee?.bankInfo);
  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? bankInfo : selectedEmployeeBankInfo;

  const methods = useForm<BankInfo>({
    defaultValues: {
      bankName: currentDataOrigin?.bankName || '',
      bankAccountNumber: currentDataOrigin?.bankAccountNumber || '',
    },
  });

  const onSaveHandler = async (data: BankInfo): Promise<void> => {
    if (!employeeId) return;

    try {
      await collectUserBankInfo({ bankInfo: data, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save address:', error);
    }
  };

  useEffect(() => {
    if (currentDataOrigin) {
      methods.reset({
        bankName: currentDataOrigin?.bankName || '',
        bankAccountNumber: currentDataOrigin?.bankAccountNumber || '',
      });
    }
  }, [currentDataOrigin]);

  return (
    <Fragment>
      {userRole !== UserRoles.EMPLOYEE ? (
        <FormProvider {...methods}>
          <GlobalContainer>
            <Sidebar />
            <section className={classNames('bank-info')}>
              <form className={classNames('bank-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
                <StatusPanel />
                <SharedSectionHeader title="Bank Info" subtitle="Leave information about your bank" />
                {isEditModeEnabled ? <BankInfoFormBody /> : <BankInfoPreviewBody />}
              </form>
            </section>
          </GlobalContainer>
        </FormProvider>
      ) : (
        <FormProvider {...methods}>
          <section className={classNames('bank-info')}>
            <form className={classNames('bank-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
              <StatusPanel />
              <SharedSectionHeader title="Bank Info" subtitle="Leave information about your bank" />
              {isEditModeEnabled ? <BankInfoFormBody /> : <BankInfoPreviewBody />}
            </form>
          </section>
        </FormProvider>
      )}
    </Fragment>
  );
};
