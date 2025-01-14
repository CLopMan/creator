# masked operations

.text
main:
    vadd.vi v0 v0 7 # operar los primeros 3 elementos
    vadd.vi v1 v1 3
    vadd.vi v2 v2 2
    vadd.vv v3 v1 v2 v0.t