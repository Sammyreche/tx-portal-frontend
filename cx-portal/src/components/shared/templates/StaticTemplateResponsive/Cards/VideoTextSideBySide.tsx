/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { ProviderProps } from '../StaticTypes'
import { Typography } from 'cx-portal-shared-components'
import '../StaticTemplate.scss'

export default function VideoTextSideBySide({
  provider,
}: {
  provider: ProviderProps
}) {
  return (
    <div className={'imageVideoTextSideBySide'}>
      <div>
        <iframe
          title="Video"
          className="video"
          src={provider.videoUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
      <div className={'titleDescriptionBody'}>
        <Typography variant="h2">{provider.title}</Typography>
        <Typography className={'providerDescription'} variant="body1">
          {provider.description}
        </Typography>
      </div>
    </div>
  )
}
