'use client';
import { Select, Skeleton } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { Issue, User } from '@/generated/prisma/client';
import axios from 'axios';

const fetchUsers = () =>
  axios.get<User[]>('/api/users').then((res) => res.data);

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 60 * 1000,
  });

  if (isLoading) return <Skeleton height="35px" />;
  if (error) return null;

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || 'unassigned'}
      onValueChange={(userId) => {
        const assignedToUserId = userId === 'unassigned' ? null : userId;
        axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserId,
        });
      }}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
