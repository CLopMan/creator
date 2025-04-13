.text
main:

    li t0 9
    vadd.vi v0 v0 7
    vadd.vi v1 v1 -1

    vzext.vf2 v2 v1
    vzext.vf4 v3 v1
    vzext.vf8 v4 v1

    vzext.vf2 v5 v1 v0.t
