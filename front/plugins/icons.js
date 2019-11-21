import Vue from 'vue'
import {
  PieChartOutline,
  TableOutline,
  UserOutline,
  BarChartOutline,
  CalendarOutline,
  CheckOutline,
  DeleteOutline,
  EditOutline
} from '@ant-design/icons'
import AntdIcon from '@ant-design/icons-vue'

AntdIcon.add(
  PieChartOutline,
  TableOutline,
  UserOutline,
  BarChartOutline,
  CalendarOutline,
  CheckOutline,
  DeleteOutline,
  EditOutline
)

Vue.use(AntdIcon)
