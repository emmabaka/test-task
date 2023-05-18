import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ThreeDots } from "react-loader-spinner";
import UserCard from "../UserCard/UserCard";
import fetchUsers from "../../api/fetchUsers";
import { normalizeData } from "../../helpers/normalizeData";
import styles from "./UserSection.module.scss";

const UserSection = ({ users, setUsers }) => {
  const [nextUrl, setNextUrl] = useState("");
  const [firstFetch, setFirstFetch] = useState(true);
  const [lastPage, setLastPage] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsers = (link) => {
    setLoad(true);
    const data = fetchUsers(link);
    return data
      .then((res) => {
        const { nextLink, normalized, page, totalPage } = normalizeData(res);
        if (firstFetch) {
          setUsers([...normalized]);
          setFirstFetch(false);
        } else {
          setUsers((prev) => {
            const isPrevUsers = normalized.some((currItem) =>
              prev.some((prevItem) => prevItem.id === currItem.id)
            );

            if (isPrevUsers) return prev;

            return [...prev, ...normalized];
          });
        }

        setNextUrl(nextLink);
        if (page === totalPage) setLastPage(true);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoad(false));
  };

  return (
    <section className={styles.users} id="users">
      <div className="container">
        <h2 className="title">Working with GET request</h2>
        <div className={styles.usersWrapper}>
          {users.map((user) => {
            return <UserCard key={user.id} user={user} />;
          })}
        </div>

        <div className={styles.spinnerWrapper}>
          {load ? (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#f4e041"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            !lastPage && (
              <button
                className={styles.moreButton}
                onClick={() => getUsers(nextUrl)}
              >
                Show more
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
};
export default UserSection;

UserSection.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
};
