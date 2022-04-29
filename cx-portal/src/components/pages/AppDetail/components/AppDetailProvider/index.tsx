import { useTranslation } from 'react-i18next'
import { Typography, StaticTable, TableType } from 'cx-portal-shared-components'
import './AppDetailProvider.scss'

export default function AppDetailProvider() {
  const { t } = useTranslation()

  const tableData: TableType = {
    "head": [
      "App Provider", "Website", "E-mail", "Phone"
    ],
    "body": [
      ["Catena-X"],
      ["https://catena-x.com"],
      ["contact@catena-x.com"],
      ["+49555667788"]
    ]
  }

  return (
    <>
      <div className="provider-content">
        <div className="container">
          <Typography variant="h4">Provider Information</Typography>
          <Typography variant="body2">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
          </Typography>
          <a href="/" className="product-desc">+ more</a>
        </div>
      </div>
      <div className="privacy-table">
        <div className="container">
          <StaticTable data={tableData} horizontal={true} />
        </div>
      </div>
    </>
  )
}
