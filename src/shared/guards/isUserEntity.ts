import { UserEntity } from '@shared/interfaces/User.interfaces';
import { VacationRequestsResponse } from '@shared/interfaces/Vacation.interfaces';

export const isUserEntity = (entity: UserEntity | VacationRequestsResponse): entity is UserEntity => {
  return 'personalInfo' in entity && 'jobInfo' in entity;
};
