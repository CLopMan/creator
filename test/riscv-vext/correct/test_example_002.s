# Example vadd.vi and vsub.vi
# there's overflow when lmux > 0
.text
main:
    vadd.vi v0 v0 1 
    vadd.vi v1 v1 -1 
    vadd.vi v2 v2 15
    vadd.vi v3 v3 -16

    vsub.vi v4 v4 -1
    vsub.vi v5 v5 1
    vsub.vi v6 v6 -15
    vsub.vi v7 v7 15