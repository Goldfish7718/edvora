"use client";

import { useAuth } from "@/context/authContext";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { requestCurrentUser } = useUser();

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      requestCurrentUser();
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) return <>Loading</>;
  if (user) return children;
  else if (!loading && !user) router.push("/");
};

export default ProtectRoute;
