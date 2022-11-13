import {Avatar} from "antd";
import {useQuery} from "@tanstack/react-query";
import {fetchUserInfo} from "../../../api/UserApi";

import styles from './Sider.module.scss'
import {Fragment, useContext} from "react";
import {PlusOutlined} from "@ant-design/icons";
import Link from "next/link";
import {SiderContext} from "./SiderContext";
import {UserContext} from "../../../contexts/UserContext";

export default function SiderHeader({userId}: { userId: number }) {

  const {setUserId} = useContext(UserContext);
  const {close} = useContext(SiderContext);

  const {data: userInfo} = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserInfo(userId)
  })

  return <div className={styles.header}>
    <div className={styles.user}>
      {userInfo &&
        <Fragment>
          <Avatar
            onClick={() => setUserId(userId + 1)}
            src={`https://joeschmoe.io/api/v1/${userInfo.nickname}`}
            shape="circle"
            style={{width: "3.5em", height: "3.5em", backgroundColor: 'white'}}
          />
          <p>Hello {userInfo.nickname}</p>
        </Fragment>
      }
    </div>

    <div>
      <Link onClick={close} href="/contacts">
        <PlusOutlined/>
      </Link>
    </div>

  </div>
}
