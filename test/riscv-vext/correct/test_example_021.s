# lmulexp <= 1
# Test vsssege
.data
values16: .half 0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
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
    li t4 20
    li t5 21

    li t6 6

    # prepare data
    vadd.vx v8 v8 t3
    vadd.vx v9 v9 t4
    vadd.vx v10 v10 t5
    
    vadd.vx v2 v2 t3
    vadd.vx v3 v3 t4
    vadd.vx v4 v4 t5

    vadd.vi v0 v0 14



    vssseg3e16.v v2 (t0) t6
    vssseg3e16.v v8 (t1) t6 v0.t

    vle16.v v12 0(t0)
    addi t0 t0 14
    vle16.v v13 0(t0)
    addi t0 t0 14
    vle16.v v14 0(t0)

    vle16.v v15 0(t1)
    addi t1 t1 14
    vle16.v v16 0(t1)
    addi t1 t1 14
    vle16.v v17 0(t1)
