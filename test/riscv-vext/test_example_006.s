# sew = 16 lmulexp <= 1
.data
result: .half 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0

.text

main: 
    la t0 result
    addi t1 x0 -92

    vadd.vx v0 v0 t1
    vse16.v v0 0(t0)
    vle16.v v2 0(t0)