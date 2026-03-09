import React from 'react';
import IssueActions from '@/app/issues/list/_components/IssueActions';
import { IssueTableSkeleton } from '@/app/issues/list/_components/IssueTable';

const LoadingIssuesPage = () => {
  return (
    <div>
      <IssueActions />
      <IssueTableSkeleton />
    </div>
  );
};

export default LoadingIssuesPage;
