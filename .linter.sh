#!/bin/bash
cd /home/kavia/workspace/code-generation/serenilux-63073-506f60a2/serenilux_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

