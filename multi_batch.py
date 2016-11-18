import os
import multiprocessing
import itertools
import numpy as np

all_para_list   = []
divide_num      = 20

def webppl_it(indx):
    global all_para_list

    cmd_str     = 'webppl simu_cons_batch.wppl %.1f %.1f %.1f --require ndarray --require save-pixels > results/%s.txt'
    len_list    = len(all_para_list)
    start_ind   = min(indx*divide_num, len_list)
    end_ind     = min((indx+1)*divide_num, len_list)

    for now_indx in range(start_ind, end_ind):
        now_para    = all_para_list[now_indx]
        now_name    = 'test_%.1f_%.1f_%.1f' % now_para
        cmd_str_now = cmd_str % (now_para[0],now_para[1],now_para[2],now_name)
        print(cmd_str_now)
        os.system(cmd_str_now)

if __name__=='__main__':
    #args = range(int(np.ceil(len(file_list)*1.0/options.mapn)))
    #global all_para_list
    mu_illu     = [2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6, 3.8]
    mu_refl     = [0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8]
    sigma_all   = [0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8]
    
    for i in itertools.product(mu_illu, mu_refl, sigma_all):
        all_para_list.append(i)
    print(len(all_para_list))
    args = range(int(np.ceil(len(all_para_list)*1.0/divide_num)))
    pool = multiprocessing.Pool(processes=8)
    r = pool.map_async(webppl_it, args)
    r.get()
    print('All done!')
