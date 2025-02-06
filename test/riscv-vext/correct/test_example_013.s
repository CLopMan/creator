# Example vadd.vi and vsub.vi
.text
main:
    vadd.vi v0 v0 1 
    vadd.vi v2 v2 -1 
    vadd.vi v4 v4 15
    vadd.vi v6 v6 -16

    vsub.vi v8 v8 -1
    vsub.vi v10 v10 1
    vsub.vi v12 v12 -15
    vsub.vi v14 v14 15