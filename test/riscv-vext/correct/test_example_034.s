.data
    mask: .byte 170, 170, 170, 170,
                170, 170, 170, 170,
                170, 170, 170, 170,
                170, 170, 170, 170
.text

main:
    la a0 mask
    vl1re8.v v0 (a0)

    #vmseq.vv v1 v6 v7
    #vmsne.vv v2 v6 v7
    #vslt.vv  v3 v6 v7
    #vsle.vv  v4 v6 v7
    #vmsgt.vv v5 v6 v7

    vmseq.vv v8 v6 v7 v0.t 
    vmsne.vv v9 v6 v7 v0.t
    vslt.vv  v10 v6 v7 v0.t
    vsle.vv  v11 v6 v7 v0.t
    vmsgt.vv v12 v6 v7 v0.t

    vmseq.vx v13 v6 t0 v0.t
    vmseq.vx v14 v6 t0

    vmseq.vi v15 v6 0
    vmseq.vi v15 v6 0 v0.t