import { PageNotificationsProps } from 'cx-portal-shared-components'
import { ErrorServiceState } from 'features/error/types'

export const PAGE_SIZE = 15

export type Nullable<T> = T | null

export interface IHashMap<T> {
  [item: string]: T
}

export type TableType = {
  head: string[]
  body: string[][]
}

export interface GeographicCoordinate {
  longitude: number
  latitude: number
  altitude?: number
}

export type SearchParams = {
  readonly name?: string
  readonly page: number
  readonly size: number
}

export interface CardImage {
  src: string
  alt?: string
}

export enum RequestState {
  NONE,
  SUBMIT,
  OK,
  ERROR,
}

export interface AsyncState {
  request: RequestState
  error: string
}

export interface AsyncDataState<T> extends AsyncState {
  data: T
}

export interface ListState<T> {
  items: T[]
  change: T | null
  request: RequestState
  error: string
}

export const InitialListState = {
  items: [],
  change: null,
  request: RequestState.NONE,
  error: '',
}

export type PaginMeta = {
  totalElements: number
  totalPages: number
  page: number
  contentSize: number
}

export const initialPaginMeta: PaginMeta = {
  totalElements: 0,
  totalPages: 0,
  page: 0,
  contentSize: 0,
}

export type PaginResult<T> = {
  meta: PaginMeta
  content: T[]
}

export const initialPaginResult = { meta: { ...initialPaginMeta }, content: [] }

export enum PAGES {
  ROOT = '',
  HOME = 'home',
  REGISTRATION = 'registration',
  APPSTORE = 'appstore',
  APP_MARKETPLACE = 'appmarketplace',
  APP_DETAIL = 'appdetail',
  DATACATALOG = 'datacatalog',
  DATA_MANAGEMENT = 'datamanagement',
  DIGITALTWIN = 'digitaltwin',
  SEMANTICHUB = 'semantichub',
  DEVELOPERHUB = 'developerhub',
  CONNECTOR = 'connector',
  ACCOUNT = 'account',
  USER_DETAILS = 'userdetails',
  NOTIFICATIONS = 'notifications',
  ORGANIZATION = 'organization',
  PARTNER_NETWORK = 'partnernetwork',
  USER_MANAGEMENT = 'usermanagement',
  TECHNICAL_USER_MANAGEMENT = 'technicaluser',
  TECHNICAL_SETUP = 'technicalsetup',
  TECHNICAL_USER_DETAILS = 'userdetails',
  APPLICATION_REQUESTS = 'applicationrequests',
  APP_USER_DETAILS = 'appuserdetails',
  INVITE = 'invite',
  ADMINISTRATION = 'admin',
  HELP = 'help',
  CONTACT = 'contact',
  IMPRINT = 'imprint',
  PRIVACY = 'privacy',
  TERMS = 'terms',
  COOKIE_POLICY = 'cookiepolicy',
  THIRD_PARTY_LICENSES = 'thirdpartylicenses',
  SETTINGS = 'settings',
  DEVELOPER = 'developer',
  TESTAPI = 'testapi',
  TRANSLATOR = 'translator',
  LOGOUT = 'logout',
  ERROR = 'error',
}

export enum ROLES {
  EVERYONE = '*',
  CX_ADMIN = 'CX Admin',
  ADMIN_CONNECTOR = 'Admin - Connector Setup',
  ADMIN_USER = 'Admin - User Management',
  INVITE_NEW_PARTNER = 'invite_new_partner',
  SETUP_IDP = 'setup_idp',
  SETUP_CLIENT = 'setup_client',
  APPSTORE_VIEW = 'view_apps',
  APPSTORE_ADD = 'add_app',
  APPSTORE_EDIT = 'edit_apps',
  APPSTORE_FILTER = 'filter_apps',
  APPSTORE_DELETE = 'delete_apps',
  CONNECTOR_SETUP = 'setup_connector',
  DATACATALOG_VIEW = 'view_data_catalog',
  DIGITALTWIN_VIEW = 'view_digital_twin',
  DIGITALTWIN_ADD = 'add_digital_twin',
  DIGITALTWIN_DELETE = 'delete_digital_twin',
  SEMANTICHUB_VIEW = 'view_semantic_model',
  SEMANTICHUB_ADD = 'add_semantic_model',
  SEMANTICHUB_DELETE = 'delete_semantic_model',
  USERMANAGEMENT_VIEW = 'view_user_management',
  USERMANAGEMENT_ADD = 'add_user_account',
  USERMANAGEMENT_DELETE = 'delete_user_account',
  USERMANAGEMENT_VIEW_USER_ACCOUNT = 'view_user_account',
  ORGANIZATION_VIEW = 'view_organization',
  PARTNER_NETWORK_VIEW = 'view_partner_network',
  DEVELOPER = 'catenax_developer',
  TECHNICAL_SETUP_VIEW = 'view_technical_setup',
  FE_DEVELOPER = 'FE Developer',
}

export type IPage = {
  name: string
  role?: string
  element: JSX.Element
  isRoute?: boolean
  children?: string[]
}

type LinkItem = Partial<Record<'href' | 'to', string>>

export interface Tree {
  name: string
  children?: Tree[]
}

export interface MenuItem extends LinkItem, Tree {
  title: string
  children?: MenuItem[]
}

export type UserInput = {
  key: string
  i18n: string
  helperText: string
  pattern: RegExp
  value: string
  valid: boolean
}

export const initServicetNotifications: PageNotificationsProps = {
  open: false,
  severity: undefined,
  title: '',
  description: '',
}

export const initErrorServiceState: ErrorServiceState = {
  hasError: false,
  hasNavigation: false,
  header: '',
  title: '',
  description: '',
  reloadPageLink: '',
  reloadButtonTitle: '',
  homePageLink: '',
  homeButtonTitle: '',
}
