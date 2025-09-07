export interface VacationRequestsEntity {
  userId: string;
  vacationDates: string[];
  isApproved?: boolean;
}

export interface VacationRequestsUser {
  firstName: string;
  lastName: string;
  nationality: string;
  company: string;
}

export interface VacationRequestsResponse {
  _id: string;
  userId: string;
  vacationDates: string[];
  isApproved: boolean;
  createdAt: string;
  user: VacationRequestsUser;
}

export interface VacationRequestDecision {
  vacationRequestId: string;
  userId: string;
  decision: VacationDecision;
  reviewerId: string;
}

export type VacationDecision = 'approved' | 'rejected';
