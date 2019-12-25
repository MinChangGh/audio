import Vue from 'vue'
import {
  Button,
  Checkbox,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Icon,
  Input,
  Menu,
  MenuItem,
  MenuItemGroup,
  Option,
  Select,
  Submenu,
  Table,
  TableColumn,
  MessageBox,
  Message
} from 'element-ui'

Vue.use(Message)
Vue.use(MessageBox)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Icon)
Vue.prototype.$message = Message
