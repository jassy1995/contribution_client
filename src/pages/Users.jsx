import React, { useMemo, useState } from 'react';
import PageTitle from '../components/PageTitle.jsx';
import { format } from 'date-fns';
import Card from '../components/global/Card.jsx';
import { useGetUsersQuery } from '../lib/api/users.js';
import classNames from 'classnames';
import NoData from '../components/global/NoData.jsx';
import { useDebounce } from 'react-use';
import IconButton from '../components/global/IconButton.jsx';
import UserDetails from '../components/core/users/UserDetails.jsx';
import { TbAlertCircle, TbChevronLeft, TbChevronRight, TbPlus, TbSearch, TbX } from 'react-icons/tb';
import { cn, firstUpperCase } from '@/lib/utils.js';
import NewUser from '@/components/core/collections/NewUser.jsx';
import { Button } from '@/components/ui/button.jsx';

const limit = 10;

const Users = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);

  const [searchDebounced, setSearchDebounced] = useState('');
  useDebounce(() => setSearchDebounced(search), 1000, [search]);

  const {
    data: { users = [], next, total = limit } = {},
    isLoading,
    isFetching,
  } = useGetUsersQuery({ search: searchDebounced, page, limit });

  const currentUser = useMemo(() => {
    return users.find((user) => user._id === id);
  }, [users, id]);

  const totalPages = Math.ceil(total / limit);

  const gotoNextPage = () => {
    setPage((p) => Math.min(p + 1, totalPages));
  };

  const gotoPreviousPage = () => {
    setPage((p) => Math.max(p - 1, 1));
  };

  const handleClick = (user) => {
    setId(user._id);
    setIsDetailsOpen(true);
  };

  return (
    <>
     <div className="flex items-start justify-between mb-4">
        <PageTitle>Users</PageTitle>
        <Button className={cn('px-4 py-2 rounded-xl bg-blue-800 text-white transition-all duration-200 flex items-center gap-3')}
                  variant="outline"
                  leftIcon={<TbPlus size="20" />}
                  onClick={() => setIsOpen(true)}
                >
                  <TbPlus size="20" />
                  New
        </Button>
     </div>
      <div className="mb-8 flex justify-between items-center">
        <div className="relative w-[300px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search.."
            type="text"
            className="w-full bg-slate-100 py-3 rounded-full px-14"
          />
          <TbSearch className="absolute left-5 top-1/2 -translate-y-1/2 opacity-60" size="20" />
          {!!search && (
            <IconButton
              onClick={() => setSearch('')}
              variant="subtle"
              icon={<TbX size="20" />}
              color="red"
              rounded
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            />
          )}
        </div>
        {!!users.length && (
          <div className="flex items-center gap-2">
            <IconButton
              onClick={gotoPreviousPage}
              variant="subtle"
              icon={<TbChevronLeft size="20" />}
              color="black"
              rounded
              size="sm"
              disabled={page === 1}
            />
            <div className="w-40">
              <select
                value={page}
                onChange={(e) => setPage(parseInt(e.target.value))}
                className="py-2 px-5 rounded-xl w-full transition duration-300 focus-within:ring-2 ring-offset-[3px] ring-blue-800 ring-opacity-60 relative bg-transparent border border-zinc-300"
              >
                {isLoading || isFetching ? (
                  <option value="">Loading..</option>
                ) : (
                  Array.from({ length: totalPages }, (_, index) => index + 1).map((option) => (
                    <option key={option} value={option}>
                      Page {option} of {totalPages}
                    </option>
                  ))
                )}
              </select>
            </div>
            <IconButton
              onClick={gotoNextPage}
              variant="subtle"
              icon={<TbChevronRight size="20" />}
              color="black"
              rounded
              size="sm"
              disabled={next === null}
            />
          </div>
        )}
      </div>
      <div>
        {isLoading ? (
          <div className="h-[200px] animate-pulse bg-slate-200 rounded-3xl"></div>
        ) : (
          <>
            {users.length > 0 ? (
              <Card className="relative overflow-x-auto">
                <table className="w-full text-[.95rem] text-left">
                  <thead className="text-gray-500 border-b border-slate-200">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Date Added
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, i) => (
                      <tr
                        key={user._id}
                        className={classNames('hover:bg-gray-50 cursor-pointer select-none', {
                          'border-b border-gray-200': i < users.length - 1,
                        })}
                        onClick={() => handleClick(user)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {firstUpperCase(user.firstName)} {firstUpperCase(user.middleName || '')} {firstUpperCase(user.lastName)}
                          {(user.role === 'admin') && (
                            <div className="px-2.5 py-1 text-xs ml-2 leading-none inline-block rounded-full border border-gray-600 text-gray-600">
                              admin
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.phone || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {format(new Date(user.createdAt), 'do MMM, yyyy')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            ) : (
              <NoData icon={<TbAlertCircle />} text="No User found" />
            )}
          </>
        )}
      </div>

      <UserDetails isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} user={currentUser} />
      <NewUser isOpen={isOpen} onClose={() => setIsOpen(false)} />
        
    </>
  );
};

export default Users;
