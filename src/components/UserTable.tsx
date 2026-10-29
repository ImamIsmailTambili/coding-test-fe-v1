import type { User } from "../types";
import { fullName, initials } from "../utils/processors";

const th = "px-4 py-3 text-left text-sm font-semibold text-muted";
const td = "px-4 py-3 align-middle";

export function UserTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#8B9A6E] bg-surface">
      <table className="w-full min-w-180 border-collapse">
        <thead>
          <tr className="border-b border-[#8B9A6E]">
            <th className={th}>Pengguna</th>
            <th className={th}>Email</th>
            <th className={th}>Telepon</th>
            <th className={th}>Perusahaan</th>
            <th className={th}>Usia</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#8B9A6E]">
          {users.map((u) => (
            <tr key={u.id}>
              <td className={td}>
                <div className="flex items-center gap-3 font-semibold">
                  {u.image ? (
                    <img
                      src={u.image}
                      alt=""
                      loading="lazy"
                      className="h-9 w-9 rounded-full bg-canvas"
                    />
                  ) : (
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-canvas text-xs">
                      {initials(u)}
                    </span>
                  )}
                  <span>{fullName(u)}</span>
                </div>
              </td>
              <td className={td}>{u.email}</td>
              <td className={td}>{u.phone}</td>
              <td className={td}>
                {u.company?.name || "-"}
                <small className="block text-muted">{u.company?.title}</small>
              </td>
              <td className={td}>{u.age || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
