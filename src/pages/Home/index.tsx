import React, {useState, useEffect} from 'react';
import {Button, Space} from 'antd-mobile'
import {publicKeyApi} from "@/api/login";
import {setProjectInfo} from "@/store/actions/project";
import {useDispatch, useSelector} from "react-redux";
import './index.less'


interface IProps {
  name?: string
}

const Demo: React.FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getPublicKey().then()
  }, []);
  const getPublicKey = async () => {
    const res = await publicKeyApi();
    if (res && res.code == 0) {
      const key: string =
        "-----BEGIN PUBLIC KEY-----" + res.data + "-----END PUBLIC KEY-----";
      localStorage.setItem("EPMS_PUBLICKEY", key);
    }
  };
  const project = useSelector((store: any) => {
    return store.storeData.project;
  });
  return (
    <div className='homeMain'>
      <span>{project?.projectName}</span>
      <Space wrap>
        <Button
          color='success'
          onClick={() => {
            dispatch(
              setProjectInfo({
                projectId: '123',
                projectName: '项目名称',
                projectAbbreviation: 'BOE',
              })
            );
          }}
        >
          选择项目
        </Button>
        <Button
          color='primary'
          onClick={() => {
            dispatch({
              type: 'LOGOUT'
            });
          }}
        >清除项目</Button>
      </Space>
    </div>
  );
};
export default Demo;
