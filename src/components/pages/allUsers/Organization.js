import React, { useEffect, useState } from "react";
import { isEmpty } from "../../Utils/isEmpty";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../../actions/userProfil.action";

const Organization = ({ allusers, jobs }) => {
  const services = [];
  const [service, setService] = useState([]);
  const [showService, setShowService] = useState(false);
  const [whatService, setWhatService] = useState("");
  const [selected, setSelected] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    jobs.map((job) => {
      if (!isEmpty(job)) {
        services.push(job.service_name);
      }
    });
    setService([...new Set(services)]);
  }, []);

  const getUserProfil = (user) => {
    setSelected(user.id_user);
    dispatch(getUserProfile([user]));
  };

  return (
    <div>
      {!isEmpty(service) &&
        service.map((serv) => {
          return (
            <div key={serv} className="service">
              <div>
                <h2>{serv}</h2>
                {showService && whatService === serv ? (
                  <button
                    onClick={() => {
                      setShowService(false);
                      setWhatService(serv);
                    }}
                  >
                    {" "}
                    -{" "}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowService(true);
                      setWhatService(serv);
                    }}
                  >
                    {" "}
                    X{" "}
                  </button>
                )}
              </div>

              {showService && whatService === serv ? (
                <div className="service__jobs">
                  {jobs.map((job) => {
                    if (job.service_name === serv) {
                      return (
                        <div key={job.id_job}>
                          <h3>{job.job_name}</h3>
                          {allusers.map((user) => {
                            if (
                              user.service_name === serv &&
                              user.job_name === job.job_name
                            ) {
                              return (
                                <div
                                  className={
                                    selected && selected === user.id_user
                                      ? "user selected"
                                      : "user"
                                  }
                                  onClick={() => getUserProfil(user)}
                                >
                                  <img
                                    src={user.user_url_image}
                                    alt={user.user_firstname}
                                  />
                                  <p>
                                    {user.user_lastname
                                      ? user.user_firstname +
                                        " " +
                                        user.user_lastname
                                      : user.user_firstname}
                                  </p>
                                </div>
                              );
                            } else return null;
                          })}
                        </div>
                      );
                    }
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Organization;
