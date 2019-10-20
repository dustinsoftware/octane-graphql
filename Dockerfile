FROM dustinsoftware/node10-chrome AS node-build

RUN mkdir -p /app/dist

RUN groupadd -r user \
  && useradd --create-home -g user -G audio,video user \
  && chown -R user:user /app

RUN yarn global add ember-cli@3.13.1 lighthouse

RUN PATH=$PATH:"$(yarn global bin)"

RUN apt-get install -y vim

USER user

WORKDIR /app

# Copy over package manifests first, so that other source code changes don't cause packages to be
# re-restored. If a new dependency is added, the container needs to be re-built.
COPY --chown=user:user ./package.json .
COPY --chown=user:user ./yarn.lock .

RUN yarn install --frozen-lockfile

# Copy over the rest of the source.
# Note: The source will be kept in sync when the Docker container is running!
COPY --chown=user:user . .

# Optional: Run full unit and integration tests during container build
ARG RUN_TESTS
RUN if [ "$RUN_TESTS" = "true" ]; then \
  yarn test; \
  fi

#  Optional: Build all CSS and JS assets before starting watch mode
ARG FULL_EMBER_BUILD
RUN if [ "$FULL_EMBER_BUILD" = "true" ]; then \
  yarn build; \
  fi

COPY --chown=user:user supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY --chown=user:user .vscode /.vscode

# Javascript builds happen inside the Docker container run.
# This is because volumes can't be accessed during the docker build, and ember serve
# should be notified right away when source code changes *without* requiring a container rebuild.
# See docker-compose for volume mounts.

CMD ["/usr/bin/supervisord", "-c", "/app/supervisord.conf"]
