# lmulexp <= 1
# Test vlsege
.data
values16: .half 0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0

values16mask: .half 0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0

.text

main: 
    la t0 values16
    la t1 values16mask

    li t3 19

    vadd.vx v8 v8 t3
    vadd.vx v9 v9 t3
    vadd.vx v10 v10 t3
    vadd.vx v2 v2 t3
    vadd.vx v3 v3 t3
    vadd.vx v4 v4 t3
    
    vadd.vi v0 v0 14



    vsseg3e16.v v2 (t0)
    vsseg3e16.v v8 (t1) v0.t

    vlseg3e16.v v12 (t0)
    vlseg3e16.v v18 (t1)
