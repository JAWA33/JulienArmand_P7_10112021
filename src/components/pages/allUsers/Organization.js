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
    document.getElementById("profil").classList.add("firstPlace");
    document.getElementById("organization").classList.remove("firstPlace");
    dispatch(getUserProfile([user]));
  };

  return (
    <div>
      {!isEmpty(service) &&
        service.map((serv) => {
          return (
            <div key={serv} className="service">
              <div className="service__title">
                <h2>{serv}</h2>
                {showService && whatService === serv ? (
                  <div
                    className="service__title__button"
                    onClick={() => {
                      setShowService(false);
                      setWhatService(serv);
                    }}
                  ></div>
                ) : (
                  <div
                    className="service__title__button--plus"
                    onClick={() => {
                      setShowService(true);
                      setWhatService(serv);
                    }}
                  ></div>
                )}
              </div>

              {showService && whatService === serv ? (
                <div className="service__jobs">
                  {jobs.map((job) => {
                    if (job.service_name === serv) {
                      return (
                        <div key={job.id_job} className="service__jobs__title">
                          <h3 className="service__jobs__name">
                            {job.job_name}
                          </h3>
                          <div className="service__jobs__users">
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
                        </div>
                      );
                    } else return null;
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
