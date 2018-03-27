#!/bin/bash
rimraf ./common/typings && ./node_modules/.bin/gql-gen --url http://localhost:9001/graphql --template typescript --out ./common/typings/ "./mobile/**/*.ts"