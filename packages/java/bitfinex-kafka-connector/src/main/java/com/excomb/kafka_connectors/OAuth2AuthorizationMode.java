/*
 * Copyright 2021 Aiven Oy
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.excomb.kafka_connectors;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum OAuth2AuthorizationMode {

    HEADER,
    URL;

    static final List<String> OAUTH2_AUTHORIZATION_MODES =
            Arrays.stream(OAuth2AuthorizationMode.values())
                    .map(OAuth2AuthorizationMode::name)
                    .collect(Collectors.toUnmodifiableList());

                    /*
                      CollectorImpl(Supplier<A> supplier,
                        BiConsumer<A, T> accumulator,
                        BinaryOperator<A> combiner,
                        Function<A,R> finisher,
                        Set<Characteristics> characteristics) {..}
                    */          

}
