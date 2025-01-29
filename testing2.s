# sew = 16 lmulexp <= 1
.data
result: .half -92,-92,-92,-92,-92,-92,-92,-92,-92,-92,-92,-92,-92,-92,-92,-92  

.text

main: 
    la t0 result
    addi t1 x0 -92
    vadd.vi v0 v0 7

    vle16.v v2 0(t0) v0.t