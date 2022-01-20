/*
 * @Description: 自定义表单校验
 */

export type ruleType =
  | "required"
  | "tel"
  | "email"
  | "password"
  | "identityNo"
  | "english"
  | "englishAndNumber"
  | "max10"
  | "positiveInt"
  | "positive";
interface IRuleConfigObj {
  [index: string]: {
    reg: RegExp;
    message: string;
  };
}

const ruleConfigObj: IRuleConfigObj = {
  tel: {
    //  手机号校验（宽松）
    /* reg: new RegExp(
      /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    ), */
    reg: new RegExp(
      /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[0-9])\d{8}$/
    ),
    message: "请输入正确的手机号",
  },
  email: {
    //  邮箱校验
    reg: new RegExp(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),
    message: "请输入正确的邮箱",
  },
  password: {
    //  密码校验
    reg: new RegExp(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s)[^\u4e00-\u9fa5]{8,20}$/),
    message: "密码为8-20位必须有大小字母、数字和特殊符号组合",
  },
  identityNo: {
    //  身份证校验
    reg: new RegExp(
      /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
    ),
    message: "请输入正确的身份证号",
  },
  english: {
    //  英文校验
    reg: new RegExp(/^[a-z]+$/i),
    message: "输入英文",
  },
  englishAndNumber: {
    //  英文+数字校验
    reg: new RegExp(/^[a-z0-9]+$/i),
    message: "仅支持英文+数字",
  },
  max10: {
    //  最大长度10
    reg: new RegExp(/^.{0,10}$/),
    message: "最多10个字符",
  },
  positiveInt: {
    //  正整数
    reg: new RegExp(/^\+?[1-9][0-9]*$/),
    message: "输入正整数",
  },
  positive: {
     //  最多两位小数的数字
     reg: new RegExp(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/),
     message: "仅支持最多两位小数的数字",
  }
};

const getValidate = (ruleName: ruleType) => {
  const ruleConfig = ruleConfigObj[ruleName];
  return {
    validator: (rule: any, value: any, callback: any) => {
      if (ruleConfig.reg.test(value)) {
        return callback();
      }
      return callback(ruleConfig.message);
    },
  };
};

//  获取自定义校验规则
export const getValidates = (ruleNames: ruleType[]) => {
  return ruleNames.map((ruleName) => {
    if (ruleName == "required") {
      return {
        required: true,
        message: "必填项",
      };
    }
    return getValidate(ruleName);
  });
};
