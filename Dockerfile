# set base image (host OS)
FROM python:3.8

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get -y update
RUN apt-get install -y curl nano wget nginx git

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

#curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
#    gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
#   --dearmor \
#    echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" |  tee /etc/apt/sources.list.d/mongodb-org-7.0.list
# Mongo
#RUN ln -s /bin/echo /bin/systemctl
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
     gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
      --dearmor
RUN echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
RUN apt-get -y update
RUN apt-get install -y mongodb-org
# Add Yarn APT repository and key
#RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
#    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
#
## Add MongoDB APT repository and key
#RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - && \
#    echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/debian $(lsb_release -cs)/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list

## Install Yarn and MongoDB in a single step
#RUN apt-get -y update && apt-get install -y yarn mongodb-org
# Install Yarn
RUN apt-get install -y yarn

# Install PIP
#RUN easy_install pip


ENV ENV_TYPE staging
ENV MONGO_HOST mongo
ENV MONGO_PORT 27017
ENV CFLAGS="-Wno-error=array-bounds"

##########

ENV PYTHONPATH=$PYTHONPATH:/src/

# copy the dependencies file to the working directory
COPY src/requirements.txt .

# install dependencies
RUN pip install -r requirements.txt
