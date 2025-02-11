/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { CardHorizontal, Typography } from 'cx-portal-shared-components'
import { Grid, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ServiceRequest } from 'features/serviceMarketplace/serviceApiSlice'
import './ServiceMarketplace.scss'

export default function ServicesElements({
  services,
  getServices,
}: {
  services: ServiceRequest[]
  getServices: any
}) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleClick = (id: string) => {
    navigate(`/servicemarketplacedetail/${id}`)
  }

  return (
    <div className="services-main">
      <div className="mainContainer">
        <div className="mainRow">
          <Box className="services-section-main">
            <div className="services-section-content">
              <Typography
                sx={{ fontFamily: 'LibreFranklin-Light' }}
                variant="h3"
                className="section-title"
              >
                {t('content.serviceMarketplace.allServices')}
              </Typography>
            </div>
            <div className="services-container">
              <Grid container spacing={2} className="services-section">
                {services.map((service: ServiceRequest) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    key={service.id}
                    className="services-card"
                  >
                    <CardHorizontal
                      borderRadius={6}
                      imageAlt="App Card"
                      imagePath={'ServiceMarketplace.png'}
                      label={service.provider}
                      buttonText="Details"
                      onBtnClick={() => handleClick(service.id)}
                      title={service.title}
                      subTitle={getServices(service.serviceTypes)}
                      description={service.description}
                      backgroundColor="#fff"
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Box>
        </div>
      </div>
    </div>
  )
}
