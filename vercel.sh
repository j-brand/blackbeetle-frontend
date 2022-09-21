#!/bin/bash

if [[ $VERCEL_GIT_COMMIT_REF =~ "development" ]] ; then
  echo ">> Skipping deploy!"
  exit 1;
elif [[ $VERCEL_GIT_COMMIT_REF =~ "master" ]] ; then
  echo ">> Proceeding with deploy."
  exit 1; 
else
  echo ">> Skipping deploy!"
  exit 0; 
fi