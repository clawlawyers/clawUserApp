import { CHANGEVARIABLE } from '../actions/type';
import UpgradeModal from '../components/Modals/UpgradeModal';

//store all redux variables here
const INITIAL_STATE = {

  isUserLoggedIn : false,
  firstName:'',
  lastName : '',
  session_id: '',
  email: '',
  uid: '',
  phone_no: '',
  jwtToken : '',
  GPTHistory_ID : [],
  active_chatID : 'newSession',
  active_chatHistory :[],
  sessionLoader:false,
  loginLoader : false,
  userDetailLoader : false,
  botLoader : false,
  gptTokens : {
    plan: '',
    token_used :0
  },
  referralModalVisible : false,
  upgradeModalVisible : false,
  paymentModalVisible : false,
  paymentStatus : ''
};
const a = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGEVARIABLE:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};
export { a as default };