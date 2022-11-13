import {Avatar} from "antd";
import {useQuery} from "@tanstack/react-query";
import {fetchUserInfo} from "../../../api/UserApi";

import styles from './Sider.module.scss'
import {Fragment} from "react";

export default function SiderHeader({userId}: { userId: number }) {

  const {data: userInfo, isLoading} = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserInfo(userId)
  })


  return <div className={styles.header}>
    {userInfo &&
      <Fragment><Avatar
        src={`https://joeschmoe.io/api/v1/${userInfo.nickname}`}
        shape="circle"
        style={{width: "3.5em", height: "3.5em", backgroundColor: 'white'}}
      />
        <p>Hello {userInfo.nickname}</p>
      </Fragment>
    }

  </div>
}
