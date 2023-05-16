import { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import fetchUsers from "../../api/fetchUsers";
import "./UserSection.scss";

const UserSection = () => {
  const [users, setUsers] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [firstFetch, setFirstFetch] = useState(true);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsers = (link) => {
    const data = fetchUsers(link);
    return data
      .then((res) => {
        const data = normalizeData(res);
        if (firstFetch) {
          setUsers([...data.normalized]);
          setFirstFetch(false);
        } else {
          setUsers((prev) => {
            const isPrevUsers = data.normalized.some((currItem) =>
              prev.some((prevItem) => prevItem.id === currItem.id)
            );

            if (isPrevUsers) return prev;

            return [...prev, ...data.normalized];
          });
        }

        setNextUrl(data.nextLink);
        if (data.page === data.totalPage) setLastPage(true);
      })
      .catch((e) => console.log(e));
  };

  const normalizeData = (info) => {
    const { data } = info;
    const normalized = [...data.users];
    const page = data.page;
    const totalPage = data.total_pages;
    const nextLink = data.links.next_url;
    return { nextLink, normalized, page, totalPage };
  };

  return (
    <section className="users" id="users">
      <div className="container">
        <h2 className="title">Working with GET request</h2>
        <div className="users-wrapper">
          {users.map((user) => {
            return <UserCard key={user.id} user={user} />;
          })}
        </div>
        {!lastPage && (
          <button className="more-button" onClick={() => getUsers(nextUrl)}>
            Show more
          </button>
        )}
      </div>
    </section>
  );
};
export default UserSection;
