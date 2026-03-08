'use client';
import { Select } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { User } from '@/generated/prisma/client';
import axios from 'axios';

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get<User[]>('/api/users');
      setUsers(res.data);
    };
    fetchUsers();
  });
  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
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
