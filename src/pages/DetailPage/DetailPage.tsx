import useUserStore from "../../stores/useUserStore";
import defaultUserImage from "../../assets/images/default-user-image.png";
import Admin from "../../component/Admin/Admin";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import "./DetailPage.scss";

export default function DetailPage() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const data = user;

  return (
    <div className="detail flex justify-content-center align-items-center">
      <div className="mt-8">
        <Card style={{ width: "350px" }}>
          <div className="detail__top-card">
            <img
              alt=""
              src={data?.avatarUrl ?? defaultUserImage}
              className="detail__image"
            />
            <p>{data?.name}</p>
            {data?.bio && <p>{data?.bio}</p>}
          </div>
          <hr />
          <p className="flex align-items-center">
            <i
              className="pi pi-user"
              style={{ fontSize: "1.5rem", marginRight: "20px" }}
            ></i>
            <div>
              <div className="detail__login">{data?.login}</div>
              <Admin admin={data?.isSiteAdmin}></Admin>
            </div>
          </p>
          {data?.location && (
            <p className="flex align-items-center">
              <i
                className="pi pi-map-marker"
                style={{ fontSize: "1.5rem", marginRight: "20px" }}
              ></i>
              <p>{data?.location}</p>
            </p>
          )}
          {data?.websiteUrl && (
            <p className="flex align-items-center">
              <i
                className="pi pi-link"
                style={{ fontSize: "1.5rem", marginRight: "20px" }}
              ></i>
              <a
                className="detail__website"
                href={data?.websiteUrl ?? ""}
                target="_blank"
              >
                {data?.websiteUrl}
              </a>
            </p>
          )}
        </Card>
        <Button className="mt-3" label="Back" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}
