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

import { useEffect, useState, useCallback, useMemo, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme, CircularProgress } from '@mui/material'
import debounce from 'lodash.debounce'
import ServicesElements from './ServicesElements'
import RecommendedServices from './RecommendedServices'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import relativeTime from 'dayjs/plugin/relativeTime'
import './ServiceMarketplace.scss'
import {
  SearchInput,
  Typography,
  ViewSelector,
  SortOption,
} from 'cx-portal-shared-components'
import SortIcon from '@mui/icons-material/Sort'
import {
  ServiceRequest,
  useFetchServicesQuery,
} from 'features/serviceMarketplace/serviceApiSlice'

dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(relativeTime)

export default function ServiceMarketplace() {
  const { t } = useTranslation()
  const theme = useTheme()
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>('All Services')
  const [sortOption, setSortOption] = useState<string>('new')
  const [cardServices, setCardServices] = useState<ServiceRequest[]>([])

  let serviceTypeId = ''

  if (selected === 'Dataspace Services') {
    serviceTypeId = 'DATASPACE_SERVICE'
  } else if (selected === 'Consultant Services') {
    serviceTypeId = 'CONSULTANCE_SERVICE'
  }

  let sortingType = 'ReleaseDateDesc'
  if (sortOption === 'provider') {
    sortingType = 'ProviderDesc'
  }

  const indexToSplit = 2 //show only 2 services in recommended

  const { data } = useFetchServicesQuery({
    page: 0,
    serviceType: serviceTypeId,
    sortingType: sortingType,
  })
  const services = data && data.content

  useEffect(() => {
    services && setCardServices(services)
  }, [services])

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    setSelected(e.currentTarget.value)
  }

  const sortOptions = [
    {
      label: t('content.serviceMarketplace.sortOptions.new'),
      value: 'new',
    },
    {
      label: t('content.serviceMarketplace.sortOptions.provider'),
      value: 'provider',
    },
  ]

  const filterButtons = [
    {
      buttonText: t('content.serviceMarketplace.tabs.all'),
      buttonValue: t('content.serviceMarketplace.tabs.all'),
      onButtonClick: setView,
    },
    {
      buttonText: t('content.serviceMarketplace.tabs.dataspaceService'),
      buttonValue: t('content.serviceMarketplace.tabs.dataspaceService'),
      onButtonClick: setView,
    },
    {
      buttonText: t('content.serviceMarketplace.tabs.consultantService'),
      buttonValue: t('content.serviceMarketplace.tabs.consultantService'),
      onButtonClick: setView,
    },
  ]

  const debouncedFilter = useMemo(
    () =>
      debounce((expr: string) => {
        services &&
          setCardServices(
            expr
              ? services &&
                  services.filter(
                    (card: ServiceRequest) =>
                      card.title.toLowerCase().includes(expr.toLowerCase()) ||
                      card.provider
                        .toLowerCase()
                        .includes(expr.toLowerCase()) ||
                      (card.description &&
                        card.description
                          .toLowerCase()
                          .includes(expr.toLowerCase()))
                  )
              : services
          )
      }, 300),
    [services]
  )

  const doFilter = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const expr = event.target.value

      setSearchExpr(expr)
      debouncedFilter(expr)
    },
    [debouncedFilter]
  )

  const setSortOptionFn = useCallback((value: string) => {
    setSortOption(value)
    setShowModal(false)
  }, [])

  const setModalFalse = useCallback(() => {
    setShowModal(false)
  }, [])

  const setModalTrue = useCallback(() => {
    setShowModal(true)
  }, [])

  const getServices = useCallback((serviceTypeIds: string[]) => {
    const newArr: string[] = []

    serviceTypeIds?.forEach((serviceType: string) => {
      if (serviceType === 'CONSULTANCE_SERVICE')
        newArr.push('Consultance Service')
      if (serviceType === 'DATASPACE_SERVICE') newArr.push('Dataspace Service')
    })
    return newArr.join(', ')
  }, [])

  return (
    <main className="serviceMarketplace">
      <div className="mainContainer">
        <div className="mainRow">
          <Typography className="newServicesTitle" variant="h2">
            {t('content.serviceMarketplace.newServices')}
          </Typography>
          <Typography className="recommendationsTitle" variant="body1">
            {t('content.serviceMarketplace.recommendations')}
          </Typography>
          <div>
            <div className="searchContainer">
              <SearchInput
                placeholder={t('notification.search')}
                value={searchExpr}
                autoFocus={false}
                onChange={doFilter}
              />
            </div>
            <div className="filterSection" onMouseLeave={setModalFalse}>
              <ViewSelector activeView={selected} views={filterButtons} />
              <div className="iconSection">
                <SortIcon
                  onClick={setModalTrue}
                  sx={{
                    fontSize: 20,
                    color: '#939393',
                    ':hover': { color: '#0D55AF' },
                  }}
                />
              </div>
              <div className="sortSection">
                <SortOption
                  show={showModal}
                  selectedOption={sortOption}
                  setSortOption={setSortOptionFn}
                  sortOptions={sortOptions}
                />
              </div>
            </div>
            {!services ? (
              <div className="loading-progress">
                <CircularProgress
                  size={50}
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                />
              </div>
            ) : (
              <RecommendedServices
                services={cardServices && cardServices.slice(0, indexToSplit)}
                getServices={getServices}
              />
            )}
          </div>
        </div>
      </div>
      {cardServices && cardServices.length > 2 && (
        <ServicesElements
          services={cardServices.slice(indexToSplit)}
          getServices={getServices}
        />
      )}
    </main>
  )
}
