"use client";

import { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination";
import { SearchInput } from "@/components/SearchInput";
import { StatusView } from "@/components/StatusView";
import { UserTable } from "@/components/UserTable";
import { useDebounce } from "@/hooks/useDebounce";
import { useFetch } from "@/hooks/useFetch";
import { fetchUsers, PAGE_SIZE } from "@/services/api";
import { totalPages } from "@/utils/processors";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const query = useDebounce(search.trim());

  useEffect(() => setPage(1), [query]);

  const users = useFetch(
    (signal) => fetchUsers({ query, page }, signal),
    [query, page],
  );
  const items = users.data?.items ?? [];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl text-[#8B9A6E] font-bold tracking-tight">
          Pengguna
        </h1>
        <div className="flex flex-wrap gap-2">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari nama pengguna…"
          />
        </div>
      </div>
      <StatusView
        loading={users.loading}
        error={users.error}
        isEmpty={items.length === 0}
        emptyTitle="Pengguna tidak ditemukan"
        emptyHint="Coba nama lain."
        onRetry={users.retry}
      >
        <UserTable users={items} />
        <Pagination
          page={page}
          totalPages={totalPages(users.data?.total ?? 0, PAGE_SIZE)}
          onChange={setPage}
        />
      </StatusView>
    </div>
  );
}
