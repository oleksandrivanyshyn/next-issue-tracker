import { Button, Skeleton, Table } from '@radix-ui/themes';
import React from 'react';

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <div>
      <div className="mb-5">
        <Skeleton>
          <Button>New Issue</Button>
        </Skeleton>
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.RowHeaderCell>
                <Skeleton>Issue Title Placeholder</Skeleton>
                <div className="block md:hidden">
                  <Skeleton>Status</Skeleton>
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton>Status Badge</Skeleton>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton>Date Placeholder</Skeleton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssuesPage;
