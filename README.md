# README

## Local Development

### Setup

```bash
bundle install # Install gem dependencies.
yarn install   # Install npm dependencies.

# Start up the PostgreSQL database, run the migrations, and stop the database.
pg_ctl start
bundle exec rake db:reset
pg_ctl stop
```

#### Secrets

Parchment requires configured secret keys to generate and parse session tokens. These can be generated via `rails secret`, but should include at least 256 bits of randomness. The keys should be passed to the application either as an environment variable or via `rails credentials`.

If a session key is not set, you will see exceptions such as the following:

```
UndefinedSessionKeyError: Session key is undefined
```

In development and test mode, using `rails credentials` is recommended. For each environment, run `rails credentials:edit --environment development` or `test` and add the following value:

```yml
authentication:
  session_key: your value
```

In production mode, using an environment variable is recommended. Set the value of `ENV['AUTHENTICATION_SESSION_KEY']` to your generated secret.

If the secret key is changed in any environment, it will invalidate any existing session keys. Any users will be immediately logged out from the application.

### Running The App

Parchment uses a Procfile for local development. The recommended tool for running the local dependencies is [Overmind](https://github.com/DarthSim/overmind).

To start up the app, run the following command:

```bash
OVERMIND_PROCFILE=Procfile.dev overmind start
```

#### Production Mode

Running the app in Production mode requres additional steps. First, start up a local PostgreSQL process:

```bash
postgres
```

Clear out any pre-compiled assets, then re-generate them.

```bash
bundle exec rake assets:clobber assets:precompile    # Sprockets
bundle exec rake webpacker:clobber webpacker:compile # Webpack
```

Finally, start up the Rails server with some additional configuration.

```bash
AUTHENTICATION_SESSION_KEY=secret RAILS_SERVE_STATIC_FILES=true RAILS_ENV=production bundle exec rails s
```

### Auditing Dependencies

To audit the Ruby dependencies, install the `bundler-audit` gem and run `bundler-audit`.

To audit the JavaScript dependencies, run `yarn audit`.

### Running the Cucumber Features

The cucumber features require an app server running on port 5101 with the Rails environment set to "test". This can be automated via Overmind by running the following command:

```bash
OVERMIND_PROCFILE=Procfile.test overmind start
```

Once the test server is active, the features can be run via `bundle exec cucumber`, or the entire CI suite including Cucumber features run via `CI=true bundle exec thor ci:steps`.

### Attaching A Debugger

To connect to a process, use the `overmind connect` command. For example, to connect to a debugger in a Rails process, run the following command:

```bash
overmind connect web
```

To disconnect from a process, enter `CTRL+b`, then `d`.
