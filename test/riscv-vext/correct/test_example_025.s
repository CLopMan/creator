# configuration test

.text
main:

    li t0 9
    vadd.vi v0 v0 7

    vrsub.vx v1 v0 t0
    vrsub.vx v2 v0 t0 v0.t

    vrsub.vi v3 v0 9
    vrsub.vi v4 v0 9 v0.t
