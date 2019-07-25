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

### Running The App

Parchment uses a Procfile for local development. The recommended tool for running the local dependencies is [Overmind](https://github.com/DarthSim/overmind).

To start up the app, run the following command:

```bash
OVERMIND_PROCFILE=Procfile.dev overmind start
```

### Attaching A Debugger

To connect to a process, use the `overmind connect` command. For example, to connect to a debugger in a Rails process, run the following command:

```bash
overmind connect web
```

To disconnect from a process, enter `CTRL+b`, then `d`.
