import decode from "jwt-decode";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Spinner } from "@common";
import { List, Search } from "@components";
import { useAppDispatch, useAppSelector } from "@utils/hooks";

import { logout, reset } from "../../features/auth/authSlice";
import { useGetGeographiesQuery } from "../../features/geo/geo";

export const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { username } = useAppSelector((state) => state.auth);

  const searchTerm = searchParams.get("name") || "";

  const { data, isLoading } = useGetGeographiesQuery({});

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  React.useEffect(() => {
    const { token }: any = username;

    if (token) {
      const decodedToken: any = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        onLogout();
        navigate("/auth");
        window.location.reload();
      }
    }
  }, []);

  if (isLoading) return <Spinner />;

  const handleSearch = (event: any) => {
    const name = event.target.value;

    if (name) {
      setSearchParams({ name });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div>
      <Search
        isActive
        onChange={handleSearch}
        placeholder="Поиск гео-объекта"
      />
      <List data={data} isLoading={isLoading} searchTerm={searchTerm} />
    </div>
  );
};
