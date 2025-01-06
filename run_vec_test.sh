#!/bin/bash

./mk_min.sh
./creator.sh -a architecture/RISC_V_RV32IMFD_VExtenssion.json -s testing.s
#./creator.sh -a architecture/RISC_V_RV32IMFD_VExtenssion.json -s testing2.s