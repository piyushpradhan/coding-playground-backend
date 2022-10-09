#!/bin/bash

# get all busy ports
find_port_command=$( netstat -tuwanp4 2>/dev/null | awk '{print $4}' | grep ':' | cut -d ":" -f 2 )
IFS=$'\n'
busy_ports=( $find_port_command )

# echo ${busy_ports[@]}

# run the react-base docker image
# TODO: choose a port and expose it
# docker run -p 8000:3000 react-base
